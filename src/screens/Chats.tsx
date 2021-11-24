import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Avatar, Badge, Button } from 'react-native-elements';
import { COLORS, dummy, FONTS, images, SIZES } from '../constants';


const Chats = () => {
  return (
    <View style={styles.container}>
      <View
        style={styles.header}
      >
        <Text
          style={styles.headerText}
        >
          Chats
        </Text>
        <Button
          icon={{
            name: 'search',
            type: 'font-awesome',
            color: COLORS.darkgray,
          }}
          type="clear"
        />
      </View>
      <FlatList
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderText}>
              Mensajes
            </Text>
          </View>
        )}
        style={styles.list}
        data={dummy.messages}
        renderItem={({ item }) => (
          <View style={styles.chat}>
            <Avatar
              size='medium'
              source={images.profile}
              rounded
            />
            <View style={styles.chatContainer}>
              <Text style={styles.chatUser}>{item.user}</Text>
              <Text style={styles.chatText}>{item.title}</Text>
            </View>
            {
              item.count > 0 && (
                <Badge
                  value={item.count}
                />
              )
            }
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 10,
    width: '100%',
    height: 50,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    ...FONTS.h3,
    fontWeight: 'bold',
  },
  listHeader: {
    paddingVertical: 10,
  },
  listHeaderText: {
    ...FONTS.h3,
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
    marginTop: SIZES.margin,
    paddingHorizontal: 15,
  },
  chat: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
    borderColor: COLORS.gray
  },
  chatContainer: {
    flex: 1,
    marginLeft: 15,
  },
  chatUser: {
    ...FONTS.h5,
    fontWeight: 'bold',
  },
  chatText: {
    ...FONTS.body,
    color: COLORS.darkgray,
  },
});

export default Chats;