import React, { useState, useEffect, useMemo, useCallback } from "react";
import { EventItem } from "../components/eventItem/EventItem";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from 'react-redux'

export const Timetable = () => {
  const { full_name, group, subjects } = useSelector((state) => state.user)
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const lessonsResponse = await axios.get(
          "http://127.0.0.1:8000/api/lessons"
        );
        setLessons(lessonsResponse.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    }
  };

  const filteredLessons =
    lessons && group
      ? lessons.filter((lesson) => lesson.group.title === group.title)
      : subjects
      ? lessons.filter((lesson) => lesson.teacher.full_name === full_name)
      : [];

  const events = filteredLessons.map((lesson) => ({
    id: lesson.id,
    title: lesson.subject.title,
    start: lesson.start_time,
    end: lesson.end_time,
    extendedProps: {
      subjectTitle: lesson.subject.title,
      teacherFullName: lesson.teacher.full_name,
      groupTitle: lesson.group.title,
    },
  }));

  return (
    <div className="timetable">
      <div className="timetable__up">
        <div className="timetable-wrap-text">
          <h1 className="timetable__title">расписание</h1>
        </div>
        <div className="timetable__userinfo">
          {group?.title
            ? `${full_name} - ${group.title}`
            : full_name}
        </div>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "timeGridWeek,timeGridDay",
        }}
        buttonText={{
          today: "сегодня",
          month: "месяц",
          week: "неделя",
          day: "день",
          list: "лист",
        }}
        events={events}
        eventContent={({ event }) => (
          <EventItem
            subjectTitle={event.extendedProps.subjectTitle}
            teacherFullName={event.extendedProps.teacherFullName}
            groupTitle={event.extendedProps.groupTitle}
          />
        )}
        locale="ru"
        locales={["ru"]}
        localeOptions={{
          titles: {
            today: "cегодня",
          },
        }}
        timeZone="Europe/Moscow"
        slotMinTime="9:00:00"
        slotMaxTime="21:00:00"
        firstDay={1}
        hiddenDays={[0]}
        eventBackgroundColor="#8090c4"
        slotDuration="00:15:00"
      />
    </div>
  );
};

