export default class Alert {
  constructor() {
    this.path = "../json/alerts.json";
  }

  async getAlerts() {
    try {
      const response = await fetch(this.path);

      if (!response.ok) {
        throw new Error("Unable to load alerts.");
      }

      return await response.json();
    } catch (error) {
      return [];
    }
  }

  async renderAlerts() {
    const alerts = await this.getAlerts();

    // If there are no alerts, do nothing.
    if (!alerts.length) return;

    // Create the alert container.
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    // Create one paragraph for each alert.
    alerts.forEach((alert) => {
      const alertMessage = document.createElement("p");

      alertMessage.textContent = alert.message;
      alertMessage.style.backgroundColor = alert.background;
      alertMessage.style.color = alert.color;

      alertSection.appendChild(alertMessage);
    });

    // Add the alerts to the top of the main element.
    const main = document.querySelector("main");

    if (main) {
      main.prepend(alertSection);
    }
  }
}
