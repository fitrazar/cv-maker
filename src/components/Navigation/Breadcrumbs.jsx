import { Link } from "react-router";

const Breadcrumbs = ({ items = [], className = "" }) => {
  return (
    <div className={`breadcrumbs text-xs ${className}`}>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.to ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
