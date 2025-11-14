
import { type BreadcrumbItem, type OutletContext } from "@/types/layout";
import { useEffect } from "react";
import { useOutletContext } from "react-router";

export const useBreadcrumb = () => {
    const { setBreadcrumbs } = useOutletContext<OutletContext>();

    const handleSetBreadcrumbs = (breadcrumbs: BreadcrumbItem[]) => {
        setBreadcrumbs(breadcrumbs);
    };

    useEffect(() => {
        handleSetBreadcrumbs([{ title: "SBA", href: "/" }]);
    }, [setBreadcrumbs]);

    return {
        handleSetBreadcrumbs,
    };
};
