import React, { useCallback } from "react";
import { CreateCategory } from "../create-category";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { changeSelectedCategory } from "../../actions/actions";

const LinkCategoryWrapper = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  text-shadow: ${({ isCurrent }) => isCurrent && "0px 0px 9px red"};
  max-width: 150px;
  cursor: pointer;
`;

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
        return <Link category={category} />;
      })}

      <CreateCategory></CreateCategory>
    </div>
  );
};
