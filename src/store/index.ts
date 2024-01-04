import { defineStore } from 'pinia';
import { itemType } from '../ts/types/ItemType.ts';
import { CartItemType } from '../ts/types/CartItemType.ts';

export const useStore = defineStore('main', {
  state: () => ({
    categories: [
      'Smartphony', 'Notebooky', 'Tablety', 'Obaly', 'Nabíjačky, káble'
    ] as string[],
    selectedCategories: [] as string[],
    items: [
      {
        id: 1,
        name: 'Sony Xperia 10 V',
        category: 'Smartphony',
        price: 299.99
      } as itemType,
      {
        id: 2,
        name: 'Sony Xperia 1 V',
        category: 'Smartphony',
        price: 1199.99
      } as itemType,
      {
        id: 3,
        name: 'Sony Xperia 5 V',
        category: 'Smartphony',
        price: 849.99
      } as itemType,
      {
        id: 4,
        name: 'Nabíjačka 100W',
        category: 'Nabíjačky, káble',
        price: 29.99
      } as itemType,
      {
        id: 5,
        name: 'Macbook Pro',
        category: 'Notebooky',
        price: 1299.99
      } as itemType,
      {
        id: 6,
        name: 'iPad Mini',
        category: 'Tablety',
        price: 999.99
      } as itemType,
      {
        id: 7,
        name: 'Obal Sony Xperia 5 V',
        category: 'Obaly',
        price: 19.99
      } as itemType,

    ] as itemType[],
    cart: {
      isOpened: false as boolean,
      items: [
        {
          id: 4,
          name: 'Nabíjačka 100W',
          price: 29.99,
          quantity: 1
        },
        {
          id: 2,
          name: 'Sony Xperia 1 V',
          price: 1199.99,
          quantity: 1
        },
        {
          id: 6,
          name: 'iPad Mini',
          price: 999.99,
          quantity: 1
        },
      ] as CartItemType[]
    }
  }),

  actions: {
    addToCart(item: itemType) {

      const cartIndex = this.cart.items.findIndex((storeItem) => storeItem.name === item.name);

      if(cartIndex !== -1){
          return this.cart.items[cartIndex].quantity++;
      }
      else {
          const newItem: CartItemType = {
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: 1
          }
          return this.cart.items.push(newItem);
      }
    },

    deleteFromCart(name: string) {
      const deleteIndex = this.cart.items.findIndex((storeItem) => storeItem.name === name);
      return this.cart.items.splice(deleteIndex, 1);
    },

    changeQuantity(name: string, operation: string) {
      const index = this.cart.items.findIndex((storeItem) => storeItem.name === name)
      if(operation === "increase") return this.cart.items[index].quantity++;
      if(operation === "decrease") {
        this.cart.items[index].quantity--;
        if(this.cart.items[index].quantity <= 0) {
          return this.deleteFromCart(name);
        }
        return;
      }
    },

    cartPrice(): number {
      let curPrice, curQuantity: number;
      let result: number = this.cart.items.reduce((sum, item) => {
        curPrice = Number(item.price);
        curQuantity = Number(item.quantity);
        return sum += (curPrice * curQuantity);
      }, 0);
      console.log("result -> " + result)

      return Number(result.toFixed(2));
    }

  }
});
