import React from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "../Home/style";

const Favorites = ({ favorites }) => {
    return (
        <S.Home>
            <S.Content>
                <S.Header>
                    <Text size="64px" bold>
                        Favorites
                    </Text>
                </S.Header>
                <UserList users={favorites.getStorage} favorites={favorites} />
            </S.Content>
        </S.Home>
    );
};

export default Favorites;
