import { createFileRoute, redirect } from "@tanstack/react-router";
export const Route = createFileRoute("/internal")({ beforeLoad: () => { throw redirect({ to: "/portfolio" }); } });
