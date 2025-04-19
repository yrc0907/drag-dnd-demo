"use client"
import { Column, Id } from "@/types";
import { useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { DndContext } from "@dnd-kit/core";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

  function deleteColumn(id: Id) {
    setColumns(columns.filter(column => column.id !== id));
  }
  function generateId() {
    return Math.floor(Math.random() * 1000000);
  }
  function createColumn() {
    const columnToAdd: Column = {
      id: generateId(),
      title: `Column ${columns.length + 1}`,
    }
    setColumns([...columns, columnToAdd]);
    console.log(columns);
  }
  return (
    <div
      className="
        m-auto
        flex
        min-h-screen
        w-full
        items-center
        justify-center
        overflow-x-auto
        overflow-y-hidden
        px-[40px]
      "
    >
      <DndContext>

        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            {columns.map((col) => (
              <ColumnContainer column={col} deleteColumn={deleteColumn} key={col.id} />
            ))}
          </div>
          <button
            onClick={createColumn}
            className="
            h-[60px]
            w-[350px]
            min-w-[350px]
            cursor-pointer
            rounded-lg
            bg-mainBackgroundColor
            border-2
            border-columnBackgroundColor
            p-4
            ring-rose-500
            hover:ring-2
          "
          >
            Add Column
          </button>
        </div>
      </DndContext>
    </div>
  );
}
export default KanbanBoard;