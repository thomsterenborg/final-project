import React from "react";
import { Skeleton } from "primereact/skeleton";

export const EventCardSkeleton = () => {
  //this skeleteton in show while loading the events
  return (
    <div className="border-round border-1 surface-border p-4 surface-card md:max-w-23rem w-full">
      <div className="flex mb-3">
        <div>
          <Skeleton width="16rem" height="2rem" className="mb-2"></Skeleton>
          <Skeleton width="14rem" className="mb-2"></Skeleton>
        </div>
      </div>
      <Skeleton width="100%" height="220px"></Skeleton>
      <div className="mt-4">
        <Skeleton width="12rem" className="mb-2"></Skeleton>
        <Skeleton width="12rem" className="mb-2"></Skeleton>
        <Skeleton width="4.5rem" height="1.5rem"></Skeleton>
      </div>
      <div className="flex justify-content-end mt-6">
        <Skeleton width="6rem" height="2rem"></Skeleton>
      </div>
    </div>
  );
};
