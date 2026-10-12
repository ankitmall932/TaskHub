import z from "zod";

function getTodayAsDateString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export const createTaskSchema = z.object({
    topic: z.string().trim().min(1, "Topic is required"),
    heading: z.string().trim().min(1, "Topic detail is required"),
    priority: z.enum(["Low", "Medium", "High"], {
        error: "Please select a priority",
    }),
    start: z.iso.date("Please enter a valid start date"),
    due: z.iso.date("Please enter a valid due date"),
}).superRefine((task, ctx) => {
    if (task.start < getTodayAsDateString()) {
        ctx.addIssue({
            code: "custom",
            path: ["start"],
            message: "Start date cannot be before today",
        });
    }

    if (task.due < task.start) {
        ctx.addIssue({
            code: "custom",
            path: ["due"],
            message: "Due date cannot be before the start date",
        });
    }
});
