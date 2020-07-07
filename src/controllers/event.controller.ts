import Event from "../db/models/Event.model";
import { validate } from "../validations/index.validation";
import { eventInput } from "src/validations/event.validation";
import userController from "./user.Controller";

class EventController {
  public async createEvent(eventInfo: any, id: string) {
    try {
      let eventValidation = await validate(eventInput, eventInfo);
      if (Array.isArray(eventValidation))
        return { success: false, errors: eventValidation };

      const event = new Event(eventInfo);
      const user = (await userController.getUser({ _id: id })) as any;

      user.events.push(event);

      await user.save();
      await event.save();

      return { success: true, event };
    } catch (e) {
      throw e;
    }
  }
  public async updateEvent() {}
  public async deleteEvent() {}
  public async getEventById() {}
  public async getEventTitle() {}
  public async getAllEvents() {}
  public async addComment() {}
  public async getEventsBasedOnAUser() {}
  public async getEventsInAnArea() {}
}

export default new EventController();
