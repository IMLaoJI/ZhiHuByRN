import React, {Component} from 'react';
import {View,Text,Image,StyleSheet,Dimensions,ListView,StatusBar,Platform,BackAndroid} from 'react-native';
import Touch from '../utils/Touch';
import Theme from '../utils/Theme';
import { Button } from 'antd-mobile';

import Toast from 'react-native-root-toast';

let _height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container:{
    marginTop: Platform.OS=='android'?0:25,
    height: _height-25,
    backgroundColor:'#FAFAFA'
  },
  account:{
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'#00a2ed'
  },
  accountBtn:{
    flexDirection:'row',flex:.5,justifyContent:'center'
  },
  avatar:{
    width:40,
    height:40,
    borderRadius:20,
    overflow:'hidden'
  },
  homeBtn:{
    paddingTop:15,
    paddingBottom:15,
    paddingLeft:30,
    paddingRight:30,
    backgroundColor:'#f0f0f0',
    flexDirection:'row',
    justifyContent:'center'
  },
  itemActive:{
    padding:15,
    flexDirection:'row',
    backgroundColor:'#f0f0f0',
    justifyContent:'center'
  },
  themeItem:{
    padding:15,
    flexDirection:'row',
    justifyContent:'center'
  }
});

export default class SliderBar extends Component {

  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  checkForUpdate = () => {
    if (!__DEV__&&Platform.OS==='android'||Platform.OS==='ios')
      this.sync();
    else Toast.show('当前版本无法使用热更新')

  };

  

  _renderRow = (row) => {
    let theme = new Theme(this.props.zhihu.theme);
    return(
      <Touch onPress={()=>{this.props.fetchArticlesByTheme(row.id);this.props.closeDrawer()}}>
        <View style={row.active?[styles.itemActive,{backgroundColor:theme.colors.homeBtn}]:styles.themeItem}>
          <View style={{flex:.85}}><Text style={{fontSize:16,color:theme.colors.sliderBarColor}}>{row.name}</Text></View>
          <View style={{flex:.15,justifyContent:'center'}}><Image style={{width:13,height:13}} source={require('../img/ic_menu_follow.png')}/></View>
        </View>
      </Touch>
    )
  };

  render() {
    let {zhihu} = this.props;
    let {resetSideBar,backToHome,closeDrawer} = this.props;
    let theme = new Theme(zhihu.theme);
    let list = null;
    let homeIcon = theme.colors.homeBtnIcon? theme.colors.homeBtnIcon : require('../img/menu_home.png');
    if (zhihu.themeList) {
      this.ds = this.ds.cloneWithRows(JSON.parse(JSON.stringify(zhihu.themeList)));
      list = (
        <ListView
          style={{backgroundColor:theme.colors.sliderBar}}
          dataSource={this.ds}
          renderRow={this._renderRow}
        />
      )
    }
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={theme.colors.statusBar}/>
        {/*Account panel*/}
        <View style={[styles.account,{backgroundColor:theme.colors.account}]}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:.2}}>
              <Image style={styles.avatar} source={require('../img/account_avatar.jpg')}/>
            </View>
            <View style={{flex:.8,justifyContent:'center'}}>
              <Text style={{color:theme.colors.accountColor,fontSize:16}}>{'请登录'}</Text>
            </View>
          </View>
          <View style={{flexDirection:'row',marginTop:20}}>
             
            <Touch>
              <View style={styles.accountBtn}>
                <View style={{flex:.3}}><Image style={{width:32,height:32}} source={require('../img/ic_favorites_white.png')}/></View>
                <View style={{flex:.7,justifyContent:'center'}}><Text style={{color:theme.colors.accountColor}}>我的收藏</Text></View>
              </View>
            </Touch>
            <Touch onPress={this.checkForUpdate}>
              <View style={styles.accountBtn}>
                <View style={{flex:.3}}><Image style={{width:32,height:32}} source={require('../img/ic_download_white.png')}/></View>
                <View style={{flex:.7,justifyContent:'center'}}><Text style={{color:theme.colors.accountColor}}>检查更新</Text></View>
              </View>
            </Touch>
          </View>
        </View>
        {/*Come back to home*/}
        <Touch onPress={()=>{resetSideBar();backToHome();closeDrawer()}}>
          <View style={[styles.homeBtn,{backgroundColor:theme.colors.homeBtn}]}>
            <View style={{flex:.15}}><Image style={{width:20,height:20}} source={homeIcon}/></View>
            <View style={{flex:.85}}><Text style={{color:theme.colors.homeBtnText,fontSize:16}}>首页</Text></View>
          </View>
        </Touch>
        {/*Theme daily*/}
        {list}
      </View>
    );
  }

}