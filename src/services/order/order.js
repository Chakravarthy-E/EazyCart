import Cookies from "js-cookie";

export const createNewOrder = async (formData) => {
  try {
    const response = await fetch("/api/order/create-order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getAllOrdersForUser = async (id) => {
  try {
    const response = await fetch(`/api/order/get-all-orders?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const getOrderDetails = async () => {
  try {
    const response = await fetch(`/api/order/order-details?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
