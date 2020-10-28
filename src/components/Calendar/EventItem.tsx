import React, { useState, useEffect, useRef } from 'react';
import {
  deleteUserEvent,
  UserEvent,
  updateUserEvent,
} from '../../redux/user-events';
import { useDispatch } from 'react-redux';

interface Props {
  event: UserEvent;
}

export const EventItem: React.FC<Props> = ({ event }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editable) {
      inputRef.current?.focus();
    }
  }, [editable]);

  const handleDeleteClick = () => {
    dispatch(deleteUserEvent(event.id));
  };

  const handleTitleClick = () => {
    setEditable(true);
  };

  const [title, setTitle] = useState(event.title);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleBlur = () => {
    if (title !== event.title) {
      dispatch(updateUserEvent({ ...event, title: title }));
    }
    setEditable(false);
  };

  return (
    <>
      <div className="calendar-event">
        <div className="calendar-event-info">
          <div className="calendar-event-time">10:00 - 12:00</div>
          <div className="calendar-event-title">
            {editable ? (
              <input
                type="text"
                value={title}
                ref={inputRef}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ) : (
              <span onClick={handleTitleClick}>{event.title}</span>
            )}
          </div>
        </div>
        <button
          className="calendar-event-delete-button"
          onClick={handleDeleteClick}
        >
          &times;
        </button>
      </div>
    </>
  );
};
