import { useState, useEffect, useRef, useMemo } from "react";
import { SortBy, type User } from "./types";
import UsersLists from "./components/UsersLists";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [showColors, setShowColors] = useState(false);
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE);
  const [filterCountry, setFilterCountry] = useState<string | null>(null);
  const originalsUsers = useRef<User[]>([]);

  const toggleColors = () => {
    setShowColors(!showColors);
  };

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter((user) => user.email !== email);
    setUsers(filteredUsers);
  };

  const handleReset = () => {
    setUsers(originalsUsers.current);
  };

  const toggleSortByCountry = () => {
    const newSortingValue =
      sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE;
    setSorting(newSortingValue);
  };

  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalsUsers.current = res.results;
      });
  }, []);

  const filteredUsers = useMemo(() => {
    return filterCountry !== null && filterCountry.length > 0
      ? users.filter((user) => {
          return user.location.country
            .toLowerCase()
            .includes(filterCountry.toLowerCase());
        })
      : users;
  }, [users, filterCountry]);

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers;
    if (sorting === SortBy.COUNTRY) {
      return filteredUsers.toSorted((a, b) =>
        a.location.country.localeCompare(b.location.country)
      );
    }
    if (sorting === SortBy.NAME) {
      return filteredUsers.toSorted((a, b) =>
        a.name.first.localeCompare(b.name.first)
      );
    }
    if (sorting === SortBy.LAST) {
      return filteredUsers.toSorted((a, b) =>
        a.name.last.localeCompare(b.name.last)
      );
    }
  }, [filteredUsers, sorting]);

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <h2 className="uppercase text-5xl m-5 mb-10 font-extrabold ">
        Prueba Tecnica
      </h2>
      <header className="flex flex-row gap-5">
        <button className="bg-[#3d3c3c] p-2 rounded" onClick={toggleColors}>
          Colorear
        </button>
        <button
          className="bg-[#3d3c3c] p-2 rounded"
          onClick={toggleSortByCountry}
        >
          {sorting === SortBy.COUNTRY
            ? "No ordenar por país "
            : "Ordenar por país"}
        </button>
        <button className="bg-[#3d3c3c] p-2 rounded" onClick={handleReset}>
          Resetear
        </button>
        <input
          placeholder="filtrar por país"
          onChange={(e) => {
            setFilterCountry(e.target.value);
          }}
        />
      </header>
      <main className="w-[100%] mt-10">
        <UsersLists
          changeSorting={handleChangeSort}
          showColors={showColors}
          users={sortedUsers}
          handleDelete={handleDelete}
        />
      </main>
    </div>
  );
};

export default App;
