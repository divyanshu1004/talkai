"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import {useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
    return (
        <div className="overflow-scroll">
            {/* {JSON.stringify(data)} */}
        </div>
    );
};

export const MeetingsViewLoading = () =>{
    return(
        <LoadingState title="Loading Meetings" description="This may take a moment" />
    );
};
export const MeetingsViewError = () =>{
    return(
          <ErrorState title="Failed to load Meetings" description="Please try again later" />
    );
};