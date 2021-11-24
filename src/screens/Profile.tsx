import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar, Button, Card, Tab, TabView } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { COLORS, FONTS, images, SIZES } from '../constants';
import { baseURL } from '../services/httpService';
import { RootState } from '../store';

const Profile = ({ navigation }) => {
  const {
    user
  } = useSelector((state:RootState) => state.auth);
  const [tabIndex, setTabIndex] = useState(0);


  return (
    <View style={styles.container}>
      <View
        style={styles.header}
      >
        <ImageBackground
          source={images.cover}
          resizeMode="cover"
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: SIZES.padding,
              right: SIZES.padding,
            }}
            onPress={() => navigation.navigate('ProfileEditor')}
          >
            <Icon
              name="edit"
              size={25}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View
        style={styles.body}
      >
        <View
          style={styles.border}
        />
        <View
          style={styles.avatarSection}
        >
          <Avatar
            size={80}
            rounded
            source={user?.profile_photo ?
              {uri: `${baseURL}${user?.profile_photo?.url}`}
              : images.profile
            }
          />
          <Card
            containerStyle={styles.card}
          >
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.body,
                fontWeight: 'bold'
              }}
            >
              {user?.posts?.length}
            </Text>
            <Text>Posts</Text>
          </Card>
          <Card
            containerStyle={styles.card}
            wrapperStyle={styles.cardWrapper}
          >
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.body,
                fontWeight: 'bold'
              }}
            >
              {user?.followers?.length}
            </Text>
            <Text>Seguidores</Text>
          </Card>
          <Card
            containerStyle={styles.card}
          >
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.body,
                fontWeight: 'bold'
              }}
            >
              {user?.followers?.length}
            </Text>
            <Text>Siguiendo</Text>
          </Card>
        </View>
        <View
          style={styles.infoSection}
        >
          <View>
            <Text
              style={styles.user}
            >
              {`${user?.first_name} ${user?.last_name}`}
            </Text>
            <Text
              style={styles.username}
            >
              {user?.email}
            </Text>
          </View>
          <View
            style={styles.buttons}
          >
            <Button
              buttonStyle={styles.button}
              title="Seguir"
              type="outline"
            />
            <Button
              buttonStyle={styles.button}
              title='Enviar Mensaje'
              type='outline'
            />
          </View>
        </View>
        <View
          style={styles.tabsSection}
        >
          <Tab
            value={tabIndex}
            indicatorStyle={{
              backgroundColor: COLORS.darkgray,
            }}
            onChange={setTabIndex}
          >
            <Tab.Item
              title="Bio"
              containerStyle={{
                backgroundColor: COLORS.white,
              }}
              titleStyle={{
                ...FONTS.body,
                textTransform: 'capitalize',
                color: COLORS.darkgray
              }}
            />
            <Tab.Item
              title="Publicaciones"
              containerStyle={{
                backgroundColor: COLORS.white,
              }}
              titleStyle={{
                ...FONTS.body,
                textTransform: 'capitalize',
                color: COLORS.darkgray
              }}
            />
          </Tab>
          <TabView
            value={tabIndex}
            onChange={setTabIndex}
          >
            <TabView.Item>
              <ScrollView style={{ flex: 1 }}>
                <View style={styles.bio}>
                  <Text
                    style={styles.bioText}
                  >
                    Acerca de
                  </Text>
                  <Text>
                    {user?.bio}
                  </Text>
                </View>
              </ScrollView>
            </TabView.Item>
            <TabView.Item>
              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={[
                  images.cover,
                  images.cover,
                  images.cover,
                  images.cover,
                  images.cover,
                  images.cover,
                  images.cover,
                  images.cover,
                  images.cover,
                  images.cover,
                  images.cover,
                  images.cover,
                ]}
                numColumns={2}
                renderItem={({ item }) => (
                  <Image
                    source={item}
                    resizeMode="contain"
                    style={{
                      width: SIZES.width / 2,
                      height: 100,
                      marginVertical: 10
                    }}
                  />
                )}
              />
            </TabView.Item>
          </TabView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 2.5,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  border: {
    width: '100%',
    height: 30,
    borderTopLeftRadius: SIZES.padding,
    borderTopRightRadius: SIZES.padding,
    backgroundColor: COLORS.white,
    position: 'absolute',
    top: -30
  },
  avatarSection: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    marginBottom: 10
  },
  card: {
    marginHorizontal: 5,
    borderRadius: 10,
    padding: 10
  },
  cardWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoSection: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 15
  },
  user: {
    ...FONTS.body,
    fontWeight: 'bold',
  },
  username: {
    ...FONTS.caption,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20
  },
  tabsSection: {
    flex: 8,
  },
  bio: {
    padding: 15,
  },
  bioText: {
    ...FONTS.h4,
    fontWeight: 'bold',
    textAlign: 'justify'
  },
  posts: {
    padding: 15,
    flexDirection: 'row'
  }
});

export default Profile;
