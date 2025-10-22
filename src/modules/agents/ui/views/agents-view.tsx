"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import  { useTRPC } from "@/trpc/client";
import { is } from "drizzle-orm";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { ResponsiveDialog } from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";


export const AgentsView = () => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery( trpc.agents.getMany.queryOptions());

    return (
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable data={data} columns={columns}/>
            {data.length === 0 && (
                <EmptyState 
                    title="No agents found"
                    description="Create your first agent to join meetings and assist you. Each agent will follow your instructions and can interact with participants during the call."
                />
            )}
        </div>
    );
};

export const AgentsViewLoading = () =>{
    return(
        <LoadingState title="Loading agents" description="This may take a moment" />
    );
};
export const AgentsViewError = () =>{
    return(
          <ErrorState title="Failed to load agents" description="Please try again later" />
    );
};