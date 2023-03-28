import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db, storage } from "../../firebase";
import { ref, onValue, update, push, set, remove } from "firebase/database";
import {
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ProjectDetail, Schedule, Setting, Allocation } from "./components";

export default function Projects(props) {
  const history = useHistory();
  const { login } = props;

  if (!login) {
    history.push("/");
  }

  const [projects, setProjects] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [settings, setSettings] = useState([]);
  const [file, setFile] = useState("");

  const scheduleRef = ref(db, "schedule");
  const projectRef = ref(db, "projects");
  const settingRef = ref(db, "settings");
  const allocationRef = ref(db, "allocations");

  useEffect(() => {
    // getting project details
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      setProjects(data);
    });

    // getting schedule
    onValue(scheduleRef, (snapshot) => {
      const data = snapshot.val();
      setSchedules(data);
    });

    // getting setting configs
    onValue(settingRef, (snapshot) => {
      const data = snapshot.val();
      setSettings(data);
    });

    // getting allocation configs
    onValue(allocationRef, (snapshot) => {
      const data = snapshot.val();
      setAllocations(data);
    });
  }, []);

  /**
   * save project data with onchange of input
   * @param {event} e
   * @param {input name} evname
   */
  const onChangeProject = (e, evname) => {
    const kAry = evname.split(".");
    setProjects({
      ...projects,
      [kAry[0]]: {
        ...projects[kAry[0]],
        [kAry[1]]: e.target.value,
      },
    });
    update(ref(db, `projects/${kAry[0]}`), { [kAry[1]]: e.target.value })
      .then(() => {
        console.log("database successfully updated");
      })
      .catch((err) => {
        console.log("database error", err);
      });
  };

  /**
   * save schedule
   * @param {Object} schedule
   */
  const handleAddSchedule = (schedule) => {
    const newRef = push(scheduleRef);
    set(newRef, schedule)
      .then(() => {
        console.log("database successfully updated");
      })
      .catch((err) => {
        console.log("database error", err);
      });
  };

  /**
   * Delete Row
   * @param {String} rowId
   */
  const handleDeleteRow = (rowId) => {
    console.log(rowId);
    remove(ref(db, `schedule/${rowId}`));
  };

  /**
   * save allocation
   * @param {Object} allocation
   */
  const handleAddAllocation = (allocation) => {
    const newRef = push(allocationRef);
    set(newRef, allocation)
      .then(() => {
        console.log("database successfully updated");
      })
      .catch((err) => {
        console.log("database error", err);
      });
  };

  /**
   * Delete Row
   * @param {String} rowId
   */
  const handleDeleteAllocationRow = (rowId) => {
    console.log(rowId);
    remove(ref(db, `allocations/${rowId}`))
      .then(() => {
        console.log("database successfully updated");
      })
      .catch((err) => {
        console.log("database error", err);
      });
  };

  /**
   * save setting configs to firebase
   * @param {Object} configs
   */
  const handleSaveSetting = (configs) => {
    if (file) {
      const storageRef = sRef(storage, `/files/site_logo.png`);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            set(settingRef, { ...configs, token_logo: url }).then(() => {
              toast.success("Setting Information was updated.");
            });
          });
        }
      );
    } else {
      set(settingRef, configs)
        .then(() => {
          toast.success("Setting Information was updated.");
          console.log("database successfully updated");
        })
        .catch((err) => {
          console.log("database error", err);
          toast.error("database error");
        });
    }
  };

  /**
   *
   * @param {Event} e
   */
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <React.Fragment>
      <div className="pp-detail-content pt-1 mt-5">
        <div className="container">
          <Setting
            settings={settings}
            handleSaveSetting={handleSaveSetting}
            handleFileChange={handleFileChange}
          />
        </div>
        <div className="container">
          <ul className="nav nav-tabs text-end" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                data-bs-target="#home"
              >
                Project details
              </button>
            </li>
            <li className="">
              <button
                className="nav-link"
                id="schedule-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-controls="schedule"
                data-bs-target="#schedule"
                aria-selected="false"
              >
                Schedule
              </button>
            </li>
            <li className="">
              <button
                className="nav-link"
                id="allocation-tab"
                data-bs-toggle="tab"
                type="button"
                role="tab"
                aria-controls="allocation"
                data-bs-target="#allocation"
                aria-selected="false"
              >
                Allocation
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade active show"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <ProjectDetail
                projects={projects}
                onChangeProject={onChangeProject}
              />
            </div>
            <div
              className="tab-pane fade"
              id="schedule"
              role="tabpanel"
              aria-labelledby="schedule-tab"
            >
              <Schedule
                schedules={schedules}
                handleAddSchedule={handleAddSchedule}
                handleDeleteRow={handleDeleteRow}
              />
            </div>
            <div
              className="tab-pane fade"
              id="allocation"
              role="tabpanel"
              aria-labelledby="allocation-tab"
            >
              <Allocation
                allocations={allocations}
                handleAddAllocation={handleAddAllocation}
                handleDeleteAllocationRow={handleDeleteAllocationRow}
              />
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
}
