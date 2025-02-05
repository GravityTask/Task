const Filter = ({ setFilter }) => (
    <div className="d-flex flex-column flex-md-row align-items-center mb-3">
        <button className="btn btn-primary mb-2 mb-md-0 me-md-2" onClick={() => setFilter("all")}>
            All
        </button>
        <button className="btn btn-success mb-2 mb-md-0 me-md-2" onClick={() => setFilter("completed")}>
            Completed
        </button>
        <button className="btn btn-warning mb-2 mb-md-0" onClick={() => setFilter("pending")}>
            Pending
        </button>
    </div>
);

export default Filter;
