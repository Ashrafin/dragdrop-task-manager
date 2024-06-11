import Skeleton from "react-loading-skeleton";

import {
  BoardHeaderSkeletonBox,
  BoardSkeletonBox,
  ListSkeletonBox,
  CardSkeletonBox
} from "@/styles/skeleton.styles";
import { MarginSpacer } from "@/styles/global.styles";
import "react-loading-skeleton/dist/skeleton.css";

interface IBoardHeaderSkeletonProps {
  backgroundName?: string;
};

interface ISkeletonProps {
  count?: number;
};

function BoardHeaderSkeleton({ backgroundName }: IBoardHeaderSkeletonProps) {
  return (
    <BoardHeaderSkeletonBox $backgroundName={backgroundName}>
      <Skeleton baseColor="#ebedee" width="25%" />
    </BoardHeaderSkeletonBox>
  );
};

function BoardTitleSkeleton() {
  return (
    <>
      <MarginSpacer $amount={3.3} />
      <Skeleton baseColor="#cacfd2" height={30} width="20%" />
      <MarginSpacer $amount={3.3} />
    </>
  );
};

function BoardsSkeleton({ count = 1 }: ISkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <BoardSkeletonBox key={index}>
          <Skeleton baseColor="#cacfd2" />
        </BoardSkeletonBox>
      ))}
    </>
  );
};

function ListsSkeleton({ count = 1 }: ISkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <ListSkeletonBox key={index}>
          <Skeleton baseColor="#cacfd2" />
          <MarginSpacer $amount={1.4} />
          <CardsSkeleton count={count} />
        </ListSkeletonBox>
      ))}
    </>
  );
};

function CardsSkeleton({ count = 1 }: ISkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeletonBox key={index}>
          <Skeleton baseColor="#cacfd2" />
          <Skeleton baseColor="#cacfd2" />
        </CardSkeletonBox>
      ))}
    </>
  );
};

export {
  BoardHeaderSkeleton,
  BoardTitleSkeleton,
  BoardsSkeleton,
  ListsSkeleton,
  CardsSkeleton
};