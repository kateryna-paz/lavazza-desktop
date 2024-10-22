import CategoryCard from "../categoryCard/CategoryCard";
import PropTypes from "prop-types";

CategoryList.propTypes = {
  categories: PropTypes.array.isRequired,
  onCategoryClick: PropTypes.func.isRequired,
};

function CategoryList({ categories, onCategoryClick }) {
  return (
    <>
      <div className="pl-4 flex flex-row flex-wrap justify-evenly gap-3">
        {categories.map((category) => {
          return (
            <CategoryCard
              key={category.name}
              image={category.imageUrl}
              name={category.name}
              subtitle={category.subtitle}
              category={category.name}
              margin={"10px 0"}
              onClick={onCategoryClick}
            />
          );
        })}
      </div>
    </>
  );
}

export default CategoryList;
