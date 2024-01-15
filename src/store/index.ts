import { defineStore } from 'pinia';
import { ref } from 'vue';
import { itemType } from '../ts/types/ItemType.ts';
import { CartItemType } from '../ts/types/CartItemType.ts';
import { CategoryType } from '../ts/types/CategoryType.ts';

export const useStore = defineStore('main', () => {

  const categories = ref<CategoryType[]>([]);
  const selectedCategories = ref<string[]>([]);
  const items = ref<itemType[]>([]);
  const cart = ref({
    isOpened: false as boolean,
    items: [] as CartItemType[]
  })

  function fetchCategories() {
    const url: string = `${import.meta.env.VITE_URL_API}/get_categories`;

    fetch(url, {
      method: "GET"
    })
      .then((res: Response) => res.json())
      .then(data => categories.value = data)
      .catch(err => {
        console.log(err);
      })
  }

  fetchCategories();

  function fetchItems() {
    const url: string = `${import.meta.env.VITE_URL_API}/get_items`;

    fetch(url, {
      method: "GET"
    })
      .then((res: Response) => res.json())
      .then(data => items.value = data)
      .catch(err => {
        console.log(err);
      })
  }

  fetchItems();

  function addToCart(item: itemType) {

    const cartIndex = cart.value.items.findIndex((storeItem) => storeItem.name === item.name);

    if(cartIndex !== -1){
        return cart.value.items[cartIndex].quantity++;
    }
    else {
        const newItem: CartItemType = {
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            quantity: 1,
        }
        return cart.value.items.push(newItem);
    }
  }

  function deleteFromCart(name: string) {
    const deleteIndex = cart.value.items.findIndex((storeItem) => storeItem.name === name);
    return cart.value.items.splice(deleteIndex, 1);
  }

  function changeQuantity(name: string, operation: string) {
    const index = cart.value.items.findIndex((storeItem) => storeItem.name === name)
    if(operation === "increase") return cart.value.items[index].quantity++;
    if(operation === "decrease") {
      cart.value.items[index].quantity--;
      if(cart.value.items[index].quantity <= 0) {
        return deleteFromCart(name);
      }
      return;
    }
  }

  function cartPrice(): number {
    let curPrice, curQuantity: number;
    let result: number = cart.value.items.reduce((sum, item) => {
      curPrice = Number(item.price);
      curQuantity = Number(item.quantity);
      return sum += (curPrice * curQuantity);
    }, 0);
    console.log("result -> " + result)

    return Number(result.toFixed(2));
  }

  return { 
    categories,
    selectedCategories,
    items,
    cart,
    fetchCategories,
    fetchItems,
    addToCart,
    deleteFromCart,
    changeQuantity,
    cartPrice
  }

});