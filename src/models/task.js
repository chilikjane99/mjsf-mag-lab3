const DEFAULT_TASK = {
  title: "",
  description: "",
  status: 'incompleted',
  priority: 'basic'
}
export class Task {
  static TS_COMPLETED = 'completed'
  static TS_INCOMPLETED = 'incompleted'

  constructor(task = DEFAULT_TASK) {
    this.title = task.title;
    this.description = task.description;
    this.status = task.status
    this.priority = task.priority

    if (this.isTaskIdValid(task.id)) {
      this.id = task.id
      return;
    }

    this.id = makeid(10)
  }

  isTaskIdValid(id) {
    return id && id.length === 10
  }
  setStatus(status) {
    this.status = status
  }
}


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
  }
  return result;
}
