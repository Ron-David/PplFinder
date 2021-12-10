import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FilterInputForm from "../FilterInputForm"
import * as S from "./style";
import { isoCountry } from 'iso-country';


const UserList = ({ users, isLoading, favorites }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [countries, setCountries] = useState([]);
  const [currentUsers, setCurrentUsers] = useState(users);

  const [brazil, setBrazil] = useState(false);
  const [australia, setAustralia] = useState(false);
  const [canada, setCanada] = useState(false);
  const [germany, setGermany] = useState(false);

  const [filterFormList, setFilterFormList] = useState([])

  const { getStorage: favStorage, setStorage: setFavStorage } = favorites

  useEffect(() => { setCurrentUsers(users) }, [users])

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleFilterChange = (value) => {
    value = isoCountry(value) ? isoCountry(value).name : value
    const currentCountries = countries.includes(value) ? countries.filter(country => country !== value) : [...countries, value]
    setCurrentUsers(currentCountries.length === 0 ? users : users.filter(user => currentCountries.includes(user.location.country)))
    setCountries(currentCountries)
  }

  const handleFavClick = user => {
    const newFavorites = isFavorite(user) ? favStorage.filter(u => u.login.uuid !== user.login.uuid) : [...favStorage, user]
    setFavStorage(newFavorites)
  }

  const handleFilterDelete = (item) => {
    const newList = filterFormList.filter(c => c !== item)
    isFiltersOverride(item)
    handleFilterChange(item)
    setFilterFormList(newList)
  }

  const handleAddClick = (text) => {
    if (filterFormList.includes(text)) {
      setFilterFormList(filterFormList)
    } else {
      if (!isFiltersOverride(text)) {
        setFilterFormList([...filterFormList, text])
      }
      handleFilterChange(text)
    }
  }

  const isFavorite = user => {
    if (!favStorage) {
      return false
    }
    return favStorage.some(u => u.login.uuid === user.login.uuid)
  }

  const isFiltersOverride = (country) => {
    if (country === 'Brazil' || country === 'BR') {
      setBrazil(!brazil)
      return true
    }
    if (country === 'Australia' || country === 'AU') {
      setAustralia(!australia)
      return true
    }
    if (country === 'Canada' || country === 'CA') {
      setCanada(!canada)
      return true
    }
    if (country === 'Germany' || country === 'DE') {
      setGermany(!germany)
      return true
    }
    return false
  }
  return (
    <S.UserList>

      <S.Filters>
        <CheckBox value="BR" label="Brazil" isChecked={brazil} onChange={(value) => { handleFilterChange(value), setBrazil(!brazil) }} />
        <CheckBox value="AU" label="Australia" isChecked={australia} onChange={(value) => { handleFilterChange(value), setAustralia(!australia) }} />
        <CheckBox value="CA" label="Canada" isChecked={canada} onChange={(value) => { handleFilterChange(value), setCanada(!canada) }} />
        <CheckBox value="DE" label="Germany" isChecked={germany} onChange={(value) => { handleFilterChange(value), setGermany(!germany) }} />

      </S.Filters>
      <FilterInputForm buttonLabel="ADD" placeholder="Country" list={filterFormList} handleAddClick={handleAddClick} onDelete={handleFilterDelete} />

      <S.List>
        {currentUsers.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={(index === hoveredUserId || isFavorite(user))}>
                <IconButton onClick={() => handleFavClick(user)}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
