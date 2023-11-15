import React, { useContext, useState } from "react";
import { DataContext } from "../../data/datacontext";
import LittleLoading from "../../reuseables/little-loading";
const Formulars = () => {
  const { formular } = useContext(DataContext);
  const [searched, set_searched] = useState(false);
  const search_formulars = (e) => {
    const value = e.target.value;
    if (value.length !== 0) {
      const searched = formular.filter((f) => f.title.includes(value));
      set_searched(searched);
    } else {
      set_searched(false);
    }
  };
  return (
    <div className="choose-box-item">
      <div className="search-choose-item">
        <input type="text" placeholder="جستجو" onInput={search_formulars} />
      </div>
      <div className="choose-items">
        {formular ? (
          searched ? (
            searched.length !== 0 ? (
              searched.map((f, i) => (
                <span key={i++} className="choose-item">
                  {f.title}
                </span>
              ))
            ) : (
              "موردی برای نمایش وجود ندارد"
            )
          ) : (
            formular.map((f, i) => (
              <span key={i++} className="choose-item">
                {f.title}
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

export default Formulars;
