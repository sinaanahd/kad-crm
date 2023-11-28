import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
const Sellers = ({ set_seller, set_choose_box }) => {
  const { sellers } = useContext(DataContext);
  const [filtered, set_filtered] = useState(false);
  const handle_search = (e) => {
    const value = e.target.value;
    if (sellers) {
      if (value.length > 2) {
        const filtered = sellers.filter((s) => s.fullname.includes(value));
        set_filtered(filtered);
      } else {
        set_filtered(false);
      }
    }
  };
  const choose_seller = (s) => {
    set_seller(s);
    set_choose_box(false);
  };
  return (
    <div className="choose-box-item">
      <div className="search-choose-item">
        <input type="text" placeholder="جستجو" onInput={handle_search} />
      </div>
      <div className="choose-items">
        {sellers ? (
          filtered ? (
            filtered.length !== 0 ? (
              filtered.map((s) => (
                <span
                  key={s.id}
                  className="choose-item"
                  onClick={() => {
                    choose_seller(s);
                  }}
                >
                  {s.fullname}
                </span>
              ))
            ) : (
              "موردی یافت نشد"
            )
          ) : (
            sellers.map((s) => (
              <span
                key={s.id}
                className="choose-item"
                onClick={() => {
                  choose_seller(s);
                }}
              >
                {s.fullname}
              </span>
            ))
          )
        ) : (
          <LittleLoading />
        )}
      </div>
    </div>
  );
};

export default Sellers;
