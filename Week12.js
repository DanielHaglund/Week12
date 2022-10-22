class ToDoItem {
  constructor(name) {
      this.name = name;
      this.details = [];
  }
}

class Detail {
  constructor(name) {
      this.name = name;
  }
}

class FoodOrder {
  static foodItems = [];

  static getAllFoodItems() {
    return this.foodItems;
  }

  static getFoodItems(id) {
    return this.foodItems[id];
  }

  static createFoodItem(foodItem) {
    return this.foodItems.push(foodItem);
  }

  static updatefoodItem(id, newfoodItem) {
    return this.foodItems[id] = newfoodItem;
  }

  static deleteFoodItem(id) {
    return this.foodItems.splice(id, 1);
  }
}

class DOMManager {
  static foodItems;

  static getAllFoodItems() {
    this.render(FoodOrder.getAllFoodItems());
  }

  static createFoodItem(name) {
    FoodOrder.createFoodItem(new foodItem(name));
    this.render(FoodOrder.getAllFoodItems());
  }

  static deleteFoodItem(id) {
    FoodOrder.deleteFoodItem(id);
    this.render(FoodOrder.getAllFoodItems());

  }

  static addDetail(id) {
    for (let foodItem of this.foodItems) {
      if (this.foodItems.indexOf(foodItem) == id) {

        foodItem.details.push(new Detail($(`#${this.foodItems.indexOf(foodItem)}-detail-name`).val()));
        FoodOrder.updatefoodItem(id, foodItem);
        this.render(FoodOrder.getAllFoodItems());
      }
    }
  }



  static deleteDetail(foodItemID, detailID) {
    for (let foodItem of this.foodItems) {
            if (this.foodItems.indexOf(foodItem) == foodItemID) {
              for (let detail of foodItem.details) {
                if (foodItem.details.indexOf(detail) == detailID) {
                  foodItem.details.splice(foodItem.details.indexOf(detail), 1);
                  FoodOrder.updatefoodItem(foodItemID, foodItem);
                  this.render(FoodOrder.getAllFoodItems());
                }
              }
            }
        }
  }

  static render(foodItems) {
      this.foodItems = foodItems;
      $('#food-list-items').empty();
      for (let foodItem of this.foodItems) {
          $('#food-list-items').prepend(
              `<div id="${this.foodItems.indexOf(foodItem)}" class="card">
                  <div class="card-header">
                  <h2>${foodItem.name}</h2>
                  <button class="btn btn-danger" onclick="DOMManager.deleteFoodItem('${this.foodItems.indexOf(foodItem)}')">Delete</button>
                  </div>
                  <div class="card-body">
                      <div class="card">
                          <div class="row">
                              <div class="col-sm">
                                  <input type="text" id="${this.foodItems.indexOf(foodItem)}-detail-name" class="form-control" placeholder="Details">
                              </div>
                              <button id="${this.foodItems.indexOf(foodItem)}-new-detail" onclick="DOMManager.addDetail('${this.foodItems.indexOf(foodItem)}')" class="btn btn-primary form-control">Add Detail</button>
                          </div>
                       </div>
                  </div>
              </div><br>`
          );
          for (let detail of foodItem.details) {
              $(`#${this.foodItems.indexOf(foodItem)}`).find('.card-body').append(
                  `<p>
                    <span id="name-${foodItem.details.indexOf(detail)}"><strong>Detail:</strong> ${detail.name}</span> - 
                    <button class="btn btn-danger" onclick="DOMManager.deleteDetail('${this.foodItems.indexOf(foodItem)}','${foodItem.details.indexOf(detail)}')">Delete Detail</button>
                  </p>`
              );
          }
      }
  }
}

$('#create-new-food-list').click(() => {
  DOMManager.createFoodItem($('#new-food-list-name').val());
  $('#new-food-list-name').val('');
});

DOMManager.getAllFoodItems();
