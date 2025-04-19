"use client"
import { Column, Id } from "@/types";
import { useMemo, useState } from "react";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";

function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const columnsId = useMemo(() => {
    return columns.map(column => column.id);
  }, [columns]);

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

  function onDragStart(event: any) {
    console.log(event);

    if (event.active.data.current.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return
    }
  }
  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
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
      <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((col) => (
                <ColumnContainer column={col} deleteColumn={deleteColumn} key={col.id} />
              ))}
            </SortableContext>
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

        {createPortal(
          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                column={activeColumn}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
}
export default KanbanBoard;