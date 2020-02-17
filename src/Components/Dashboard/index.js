import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

import picture1 from '../../Assets/images/background1.jpeg';
import picture2 from '../../Assets/images/background2.jpeg';
import picture3 from '../../Assets/images/background3.jpg';

const DashboardContainer = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
`
const Editor = styled.div`
    height: 100%;
    width: 30%; 
    display: flex;
    flex-direction: column;
`

const EditorContainer = styled.div`
    height: 100%;
    width: 100%; 
    position: relative;
`
const Display = styled.div`
    height: 100%;
    width: 70%; 
    border: 1px solid black;
`
const Image = styled.div`
    width: 100%;  
    height: ${props => props.isDropped ? '800px' : '100px'}; 
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url(${props => props.url}); 
`
const Text = styled.div`
    width: 170px;
    position: absolute;
    font-size: ${props => props.isDropped ? '90px' : '20px'};
    z-index: 999;
    position: ${props => props.isDropped ? 'absolute' : 'relative'}; 
`

const EditResult = styled.div`
    height: 800px;
    width: 600px;
    margin: 90px auto;
    border: 1px solid black;
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    `
const StyledContextMenu = styled(ContextMenu)`
    background: white;
    z-index: 9999;
    width: 250px;
    height: auto;
 `
const StyledMenuItem = styled(MenuItem)`
    cursor: pointer;
    `
class Dashboard extends Component {

    state = {
        pictures: [
            { url: picture1, status: 'fixed', name: 'background1' },
            { url: picture2, status: 'fixed', name: 'background2' },
            { url: picture3, status: 'fixed', name: 'background3' },
        ],
        titles: [
            { text: 'text1', status: 'fixed', name: 'text1' },
            { text: 'text2', status: 'fixed', name: 'text2' },
            { text: 'text3', status: 'fixed', name: 'text3' },
        ]
    }


    handleClick = (e, data) => {
        console.log(data.foo);
    }

    onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, status) => {
        ev.preventDefault();
        const id = ev.dataTransfer.getData("id");
        const picturesLength = this.state.pictures.filter((picture) => picture.status === 'dropped')
        const pictures = this.state.pictures.filter((picture) => {
            if (picture.name === id && picturesLength < 1) {
                picture.status = 'dropped';
            }
            return picture;
        });

        const titles = this.state.titles.filter((title) => {
            if (title.name === id) {
                title.status = status;
            }
            return title;
        });

        this.setState({
            ...this.state,
            pictures,
            titles
        });
    }

    render() {
        const { pictures, titles } = this.state;
        let picturesStatus = {
            dropped: [],
            fixed: []
        }
        let textStatus = {
            dropped: [],
            fixed: []
        }
        titles.forEach((title, index) => {
            textStatus[title.status].push(

                <Text
                    draggable
                    id="draggable"
                    key={title.name}
                    isDropped={title.status === 'dropped' ? true : false}
                    onDragStart={(e) => this.onDragStart(e, title.name)}
                >
                    <ContextMenuTrigger id="draggable">
                        {title.name}
                    </ContextMenuTrigger>
                </Text>


            )
        })
        pictures.forEach((picture, index) => {
            picturesStatus[picture.status].push(
                <Image
                    url={picture.url}
                    draggable
                    id="draggable"
                    key={picture.name}
                    isDropped={picture.status === 'dropped' ? true : false}
                    onDragStart={(e) => this.onDragStart(e, picture.name)}
                />
            )
        })

        return (
            <DashboardContainer>
                <Editor >
                    <EditorContainer
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, "fixed")}
                    >
                        <p>Backgrounds</p>
                        {picturesStatus.fixed}
                        <p>Text</p>
                        {textStatus.fixed}
                    </EditorContainer>
                </Editor>
                <Display >
                    <EditResult
                        onDragOver={(e) => this.onDragOver(e)}
                        onDrop={(e) => this.onDrop(e, 'dropped')}
                    >

                        {picturesStatus.dropped}
                        {textStatus.dropped}

                        <StyledContextMenu id="draggable">
                            <StyledMenuItem onClick={this.handleClick}>
                                Copy
                            </StyledMenuItem>
                            <hr />
                            <StyledMenuItem onClick={this.handleClick}>
                                Delete
                            </StyledMenuItem>
                            <StyledMenuItem divider />
                        </StyledContextMenu>
                    </EditResult>
                </Display>
            </DashboardContainer>
        );
    }
}

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    {}
)(Dashboard);
