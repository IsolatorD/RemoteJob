import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import { COLORS, dummy, FONTS, images, SIZES } from '../constants';


const Notifications = () => {
  return (
    <View style={styles.container}>
      <View
        style={styles.header}
      >
        <Text
          style={styles.headerText}
        >
          Notificaciones
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
        style={styles.list}
        data={dummy.notifications}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Avatar
              size='medium'
              source={images.profile}
              rounded
            />
            <View style={styles.notificationText}>
              <Text style={styles.notificationTitle}>{item.title}</Text>
              <Text style={styles.notificationDateText}>{item.date}</Text>
            </View>
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
  list: {
    flex: 1,
    marginTop: SIZES.margin,
    paddingHorizontal: 15,
  },
  notification: {
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 5,
    borderColor: COLORS.gray
  },
  notificationText: {
    flex: 1,
    marginLeft: 15,
  },
  notificationTitle: {
    ...FONTS.h5,
    color: COLORS.darkgray,
  },
  notificationDate: {
    marginLeft: 'auto',
  },
  notificationDateText: {
    ...FONTS.body,
    color: COLORS.darkgray,
  },
});

export default Notifications;