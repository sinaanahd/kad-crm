import React, { useEffect, useState } from "react";
import split_in_three from "../../../functions/spilit_in_three";
import convert_to_persian from "../../../functions/convert-to-persian";
import trash from "../../../../asset/images/make-sale/trash.svg";

const CartProduct = ({
  handle_cart,
  p,
  count,
  set_new_sale_data,
  sale_data,
}) => {
  const [payment_datas, set_payment_datas] = useState([]);
  const convert_count = (count) => {
    switch (count) {
      case "c":
        return [1];
      case "2g":
        return [1, 2];
      case "3g":
        return [1, 2, 3];
      case "4g":
        return [1, 2, 3, 4];
      default:
        return [1];
    }
  };
  useEffect(() => {
    set_payment_datas([]);
    set_new_sale_data([]);
    const all_inputs = [...document.querySelectorAll(".info-price-input")];
    all_inputs.map((i) => (i.value = 0));
  }, [count]);
  useEffect(() => {
    add_sale_data();
  }, [payment_datas]);
  const handle_payment_data = (e, id) => {
    const main_array =
      payment_datas.length !== 0 ? [...payment_datas] : convert_count(count);
    const value = e.target.value;
    const index = main_array[id];
    if (value >= 0) {
      if (typeof index === "number") {
        const obj = {
          pay_data_id: p.product_id,
          id: id + 1,
          amount: parseInt(value),
        };
        main_array[id] = obj;
      } else {
        main_array[id].amount = parseInt(value);
      }
    } else {
      if (typeof index === "number") {
        const obj = {
          pay_data_id: p.product_id,
          id: id + 1,
          amount: 0,
        };
        main_array[id] = obj;
      } else {
        main_array[id].amount = 0;
      }
    }
    set_payment_datas(main_array);
  };
  const check_payments = () => {
    const datas = [...payment_datas];
    let is_all_object = false;
    datas.forEach((d) => {
      if (typeof d === "number") {
        is_all_object = true;
      }
    });
    return is_all_object;
  };
  const check_final_price = () => {
    const datas = [...payment_datas];
    if (check_payments()) {
      return false;
    }
    let sum = 0;
    datas.forEach((d) => {
      sum = sum + d.amount;
    });
    // add_sale_data();
    return sum;
  };

  // 'pay_amounts' : [[P1Gh1, P2Gh1, ...], [P1Gh2, P2Gh2, ...], ...]

  const add_sale_data = () => {
    const ref_sale_data = [...sale_data];
    const obj = {
      pay_data_id: p.product_id,
      item_payments: payment_datas,
    };
    if (!check_payments() && payment_datas.length !== 0) {
      // console.log(payment_datas);
      if (ref_sale_data.length === 0) {
        ref_sale_data.push(obj);
      } else {
        let item = ref_sale_data.find((i) => i.pay_data_id === p.product_id);
        if (item) {
          item.item_payments = payment_datas;
        } else {
          ref_sale_data.push(obj);
        }
      }
    }
    set_new_sale_data(ref_sale_data);
  };
  return (
    <div key={p.product_id} className="cart-item">
      <span className="cart-item-name-price">
        <span className="cart-item-name">{p.product_title}</span>
        <span className="cart-item-options">
          <span className="cart-item-price cart-item-option">
            <span className="cart-item-label">قیمت اصلی:‌</span>
            <span className="card-item-value">
              {split_in_three(convert_to_persian(p.product_price))} تومان
            </span>
          </span>
          {convert_count(count).map((item) => (
            <span className="input-option cart-item-option" key={item}>
              <span className="cart-item-label">
                قیمت قسط {convert_to_persian(item)}:‌
              </span>
              <span className="card-item-value">
                <input
                  type="number"
                  placeholder={`قیمت قسط ${convert_to_persian(item)}`}
                  onInput={(e) => {
                    handle_payment_data(e, item - 1);
                  }}
                  onChange={(e) => {
                    handle_payment_data(e, item - 1);
                  }}
                  onClick={(e) => {
                    e.target.value = "";
                  }}
                  className="info-price-input"
                  min={0}
                />
                <span className="item-single-price">
                  {typeof payment_datas[item - 1] !== "number" &&
                  payment_datas.length !== 0 &&
                  payment_datas[item - 1]
                    ? `${split_in_three(
                        convert_to_persian(payment_datas[item - 1].amount)
                      )} تومان`
                    : "۰ تومان"}
                </span>
              </span>
            </span>
          ))}
          <span className="cart-item-price cart-item-option">
            <span className="cart-item-label">قیمت نهایی:‌</span>
            <span className="card-item-value">
              {check_final_price()
                ? `${split_in_three(
                    convert_to_persian(check_final_price())
                  )} تومان`
                : check_final_price() === 0
                ? `۰ تومان`
                : "وارد نشده"}
            </span>
          </span>
        </span>
      </span>
      <button
        className="delete-btn"
        onClick={() => {
          handle_cart(p);
        }}
      >
        <img src={trash} alt="حذف محصول" />
      </button>
    </div>
  );
};

export default CartProduct;
