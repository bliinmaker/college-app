import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux'

export const Profile = () => {
  const { full_name, group, subjects } = useSelector((state) => state.user)

  return (
    <div className="student">
      <div className="student__up">
        <div className="student-wrap-text">
          <h1 className="student__title">личный кабинет</h1>
        </div>
      </div>
      {group && (
        <div className="student__content">
          <p className="student__content__title">Данные обо мне</p>
          <p>
            <span>имя:</span> {full_name}
          </p>
          <p>
            <span>группа:</span> {group.title}
          </p>
          <p>
            <span>факультет:</span> {group.faculty.title}
          </p>
          <p className="student__content__title student__content__title_extra">
            Предметы моей группы
          </p>
          {group.subjects.map((subject) => (
            <p key={subject.id}>- {subject.title}</p>
          ))}
        </div>
      )}
      {!group && subjects && (
        <div className="student__content">
          <p className="student__content__title">Данные обо мне</p>
          <p>
            <span>имя:</span> {full_name}
          </p>
          <p className="student__content__title student__content__title_extra">
            Предметы
          </p>
          {subjects.map((subject) => (
            <p key={subject.id}>- {subject.title}</p>
          ))}
        </div>
      )}
    </div>
  );
};

