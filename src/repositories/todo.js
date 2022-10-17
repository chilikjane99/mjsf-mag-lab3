export class ITodoRepository {
  save() {
    throw new Error("Save Not implemented");
  }

  find() {
    throw new Error("Find Not implemented");
  }

  fetch() {
    throw new Error("Fetch Not implemented");
  }
  delete() {
    throw new Error("Delete Not implemented");
  }
  update() {
    throw new Error("Update Not implemented");
  }
}

export class TodoLocalStorageRepository extends ITodoRepository {
  async __getItems() {
    return localStorage.getItem('todos') ? JSON.parse(localStorage.getItem("todos")) : [];
  }
  async __saveItems(items) {
    localStorage.setItem("todos", JSON.stringify(items));
  }
  async save(model) {
    let items = await this.__getItems();
    items.push(model);
    await this.__saveItems(items)
    return model
  }

  async find(id) {
    let items = await this.__getItems();

    const res = items.filter((item) => item.id === id);
    if (res.length > 0) {
      return res[0];
    }

    return null;
  }

  fetch() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.__getItems())
      }, 1000);
    })
  }

  async update(id, updatedItem) {
    console.log("SERVICE UPDATE TODO", id, updatedItem);
    let items = await this.__getItems();
    items = items.map(item => {
      console.log("CURRENT ITEM", item.id, id);
      if (item.id === id) {
        console.log("FINDED ITEM", item);
        return {
          ...item,
          ...updatedItem
        }
      }
      return item
    })
    console.log("ITEMS AFTER UPDATE ONE", items);
    return this.__saveItems(items)
  }
  async delete(id) {
    let items = await this.__getItems();

    const updatedItems = items.filter((item) => item.id !== id);
    return this.__saveItems(updatedItems)
  }
}
