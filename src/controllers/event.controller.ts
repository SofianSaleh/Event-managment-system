import Event from "../db/models/Event.model";
import { validate } from "../validations/index.validation";
import { eventInput } from "../validations/event.validation";
import userController from "./user.Controller";

class EventController {
  public async createEvent(eventInfo: any, id: string) {
    try {
      let eventValidation = await validate(eventInput, eventInfo);
      if (Array.isArray(eventValidation))
        return { success: false, errors: eventValidation };

      const newEvent = new Event(eventInfo);
      const user = (await userController.getUser({ _id: id })) as any;

      user.events.push(newEvent);

      await user.save();
      await newEvent.save();
      return { success: true, event: newEvent };
    } catch (e) {
      throw e;
    }
  }
  public async updateEvent(id: string, updateObj: any) {
    try {
      return await Event.findByIdAndDelete(id, updateObj);
    } catch (e) {
      throw e;
    }
  }
  public async deleteEvent() {}
  public async getEventById() {}
  public async getEventTitle() {}
  public async getAllEvents() {}
  public async addComment() {}
  public async getEventsBasedOnAUser() {}
  public async getEventsInAnArea() {}
}

export default new EventController();
