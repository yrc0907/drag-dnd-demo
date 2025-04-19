import { useSortable } from "@dnd-kit/sortable";
import { Column, Id } from "../types";
import { CSS } from "@dnd-kit/utilities";
interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
}

function ColumnContainer(props: Props) {
  const { column, deleteColumn } = props;


  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: column.id, data: {
      type: "column",
      column
    }
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`
          bg-columnBackgroundColor
          opacity-40
          border-2
          border-rose-500
          w-[350px]
          h-[500px]
          max-h-[500px]
          rounded-md
          flex
          flex-col
        `}
      ></div>
    );
  }
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-columnBackgroundColor
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
      `}
    >
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        className={`
          bg-mainBackgroundColor
          text-md
          h-[60px]
          cursor-grab
          rounded-md
          rounded-b-none
          p-3
          font-bold
          border-columnBackgroundColor
          border-4
          flex
          items-center
          justify-between
        `}
      >
        <div className="flex gap-2">
          <div
            className={`
      flex
      justify-center
      items-center
      bg-columnBackgroundColor
      px-2 
      py-1
      text-sm
      rounded-full
    `}
          >
            0
          </div>
          {column.title}
        </div>
        <button
          onClick={() => { deleteColumn(column.id) }}
        >Delete</button>
      </div>
      {/* Column task container */}
      <div className="flex flex-grow">content</div>
      {/* Column footer */}
      <div>Footer</div>
    </div>
  );
}

export default ColumnContainer;