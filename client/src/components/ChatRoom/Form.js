import React from 'react';

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input className="form-control" id="name" />
      </div>
      <div className="form-group">
        <label htmlFor="email">Description</label>
        <input
          className="form-control"
          id="description"
          placeholder=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label>
        <input
        type='date'
          className="form-control"
          id="startDate"
          placeholder=""
        />
      </div>
      <div className="form-group">
        <label htmlFor="deadline">Deadline</label>
        <input
        type='date'
          className="form-control"
          id="deadline"
          placeholder=""
        />
      </div>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
