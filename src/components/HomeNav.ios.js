import React, {Component} from 'react';
import {StyleSheet,Image,ActionSheetIOS} from 'react-native';
import NavBar, { NavGroup, NavButton, NavButtonText, NavTitle } from 'react-native-nav'
import Theme from '../utils/Theme'

let BUTTONS = ['日夜切换','粉色模式','设置','取消'];
let CANCEL_INDEX = 3;

export default class HomeNav extends Component {

  title = '首页';
  drawer = false;


  constructor(props) {
    super(props);
  }

  handleDrawer(props){
    this.drawer?props.closeDrawer():props.openDrawer();
    // this.drawer = !this.drawer;
  };

  showActionSheet(props) {
     //BUTTONS[0] = this.props.zhihu.theme==Theme.DARK?'日间模式':'夜间模式';
    ActionSheetIOS.showActionSheetWithOptions({
          options: BUTTONS,
          cancelButtonIndex: CANCEL_INDEX
        },
        (index) => {
          if(index==0){
            props.switchTheme(this.props.zhihu.theme==Theme.DARK?Theme.LIGHT:Theme.DARK);
          } else if (index==1){
            props.switchTheme(Theme.PINK);
          }
        }
    );
  }

  render() {
    let theme = new Theme(this.props.zhihu.theme);
    let title = {
        color: '#rgba(255, 255, 255, 1)',
        left: -70
        

    };
    let styles = StyleSheet.create({
      statusBar: {
        height:3,
        backgroundColor: theme.colors.statusBar
      },
      navBar: {
        backgroundColor: theme.colors.titleBar,
        height: 50,
        paddingLeft: 15
      },
      buttonText: {
        color: '#rgba(255, 255, 255, 1)'
      },
      navButton:{
        marginTop: 20,
        flex: 1
      },
      icon:{
        width:30,
       //marginBottom:25,
        height:30
      },
      icon1:{
          width:40,
       marginTop:9,
        height:40
      }
    });
    if (this.props.zhihu.title.length<4) title.left = -100;
    else if (this.props.zhihu.title.length==4) title.left = -80;
    else if (this.props.zhihu.title.length>4) title.left = -60;
    return (
      <NavBar style={styles}>
        <NavButton style={styles.navButton} onPress={()=>{this.handleDrawer(this.props)}}>
          <NavButtonText style={styles.buttonText}>
            <Image style={styles.icon} source={require('../img/ic_menu_white.png')} resizeMode={'contain'}/>
          </NavButtonText>
        </NavButton>
        <NavTitle style={title}>
          {this.props.zhihu.title}
        </NavTitle>
        <NavGroup>
          <NavButton >
            <NavButtonText style={styles.buttonText}>
              <Image style={styles.icon1} source={require('../img/ic_message_white.png')} resizeMode={'contain'}/>
            </NavButtonText>
          </NavButton>
          <NavButton  onPress={()=>{this.showActionSheet(this.props)}}>
            <NavButtonText style={styles.buttonText}>
              <Image style={styles.icon1} source={require('../img/ic_more_white.png')} resizeMode={'contain'}/>
            </NavButtonText>
          </NavButton>
        </NavGroup>
      </NavBar>
    );
  }

}
