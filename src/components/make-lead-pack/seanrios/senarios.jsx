import React, { useState, useContext } from "react";
import LittleLoading from "../../reuseables/little-loading";
import { DataContext } from "../../data/datacontext";
const Senarios = ({ set_senario, set_choose_box }) => {
  const { senarios } = useContext(DataContext);
  const [searched_senarios, set_searched_senarios] = useState(false);
  const handle_senario_search = (e) => {
    const entry = e.target.value;
    if (entry.length > 2) {
      const searched = senarios.filter((s) => s.scenario_name.includes(entry));
      set_searched_senarios(searched);
    } else {
      set_searched_senarios(false);
    }
  };
  const choose_senario = (s) => {
    set_senario(s);
    set_choose_box(false);
  };
  return (
    <div className="choose-box-item">
      <div className="search-choose-item">
        <input
          type="text"
          placeholder="جستجو"
          onInput={handle_senario_search}
        />
      </div>
      <div className="choose-items">
        {senarios ? (
          searched_senarios ? (
            searched_senarios.length !== 0 ? (
              searched_senarios.map((s) => (
                <span
                  key={s.id}
                  className="choose-item"
                  onClick={() => {
                    choose_senario(s);
                  }}
                >
                  {s.scenario_name}
                </span>
              ))
            ) : (
              "سناریویی پیدا نشد"
            )
          ) : senarios.length !== 0 ? (
            senarios.map((s) => (
              <span
                key={s.id}
                className="choose-item"
                onClick={() => {
                  choose_senario(s);
                }}
              >
                {s.scenario_name}
              </span>
            ))
          ) : (
            "سناریویی وجود ندارد"
          )
        ) : (
          <LittleLoading />
        )}
      </div>
    </div>
  );
};

export default Senarios;
