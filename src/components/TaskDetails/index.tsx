import { FormEvent, useEffect, useState } from "react";
import { httpService } from "../../services/httpService";
import { TasksEntity } from "../../types";
import { Button } from "../UI/Button";

export const OpenCard = ({
  cardId,
  closeModal,
}: {
  cardId: number;
  closeModal: () => void;
}) => {
  const [state, setState] = useState<TasksEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [newState, setNewState] = useState<TasksEntity | null>(null);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (state) {
      await httpService.put(`/card/${cardId}`, {
        title: state.title,
        description: newState?.description,
      });
      alert("Saved Successfuly");
      closeModal();
    }
  };
  const compareObjects = (obj1: TasksEntity, obj2: TasksEntity) => {
    const keys1 = Object.keys(obj1) as Array<keyof TasksEntity>;
    const keys2 = Object.keys(obj2) as Array<keyof TasksEntity>;

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };
  const handleClose = () => {
    const objectsAreEqual = compareObjects(state!, newState!);
    console.log(objectsAreEqual);
    if (!objectsAreEqual) {
      const confirmed = window.confirm(
        `Changes not saved. Are you sure you want to leave ?`
      );
      if (confirmed) {
        closeModal();
      }
    } else {
      closeModal();
    }
  };
  const deleteHandler = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${state?.title}`
    );
    if (confirmed) {
      await httpService.delete(`/card/${cardId}`);
      alert("Delete Succesfully");
      closeModal();
    } else {
      closeModal();
    }
  };
  useEffect(() => {
    const fetchCard = async () => {
      const { data } = await httpService.get("/card", {
        params: {
          cardId,
        },
      });
      setState(data);
      setNewState(data);
      setLoading(false);
    };
    fetchCard();
  }, []);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal, state, newState]);

  if (loading) {
    return <div>...Loading</div>;
  }
  if (state && newState) {
    return (
      <form
        onSubmit={submitHandler}
        className="w-auto max-h-screen overflow-y-scroll h-auto rounded-md p-4  flex  flex-col gap-4 bg-light-secondary dark:bg-dark-secondary text-light-text dark:text-dark-text"
      >
        <div className="flex justify-between">
          <div>{state.title}</div>
          <div className="cursor-pointer" onClick={handleClose}>
            X
          </div>
        </div>
        <hr />
        <div className="flex h-auto">
          <div className="flex flex-col gap-4 ">
            <span className="text-lg items-start flex font-semibold">
              Description
            </span>
            <textarea
              value={newState.description}
              onChange={(e) => {
                setNewState(() => ({
                  ...newState,
                  description: e.target.value,
                }));
              }}
              className="border-2 border-light-primary rounded-md w-full h-96"
              cols={80}
              rows={5}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <Button variant="SECONDARY" type="submit">
              Save
            </Button>
          </div>
          <div className="cursor-pointer" onClick={deleteHandler}>
            DELETE
          </div>
        </div>
      </form>
    );
  } else {
    return <div>Error Fetching Card</div>;
  }
};
