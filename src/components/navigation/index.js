import React, { useCallback } from "react";
import { CreateCategory } from "../create-category";
import { useSelector, useDispatch } from "react-redux";
import { changeSelectedCategory } from "../../actions/actions";
import { LinkCategoryWrapper } from "./styled";

const Link = ({ category }) => {
  const dispatch = useDispatch();

  const selectedCategory = useSelector((state) => {
    const selectedCategory = state.categories.selectedCategory || {};
    return selectedCategory;
  });

  const onSelect = useCallback(() => {
    dispatch(changeSelectedCategory(category));
  }, [category]);

  return (
    <LinkCategoryWrapper
      onClick={onSelect}
      isCurrent={category.name === selectedCategory.name}
    >
      {category.name}
    </LinkCategoryWrapper>
  );
};

export const Navigation = () => {
  const { data: categories } = useSelector((state) => state.categories);

  return (
    <div
      style={{
        marginTop: "50px",
        marginLeft: "50px",
      }}
    >
      {categories.map((category) => {
        return <Link key={category.url} category={category} />;
      })}

      <CreateCategory></CreateCategory>
    </div>
  );
};
