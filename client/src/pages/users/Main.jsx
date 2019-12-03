import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

import { REQUEST_URL } from "../../config.json";

import StudyGroupCard from "../../components/users/groupCard";
import MyStudyCarousel from "../../components/users/myStudyCardCarousel";

import { set_groups } from "../../reducer/users";
import { UserContext } from "./index";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 5%;
  padding-right: 5%;

  .main-jumbotron{
    padding: 2% 7% 1%;
    display:flex;
    flex-direction:column;
    align-items:center;

    .group-create-button {
      margin-top: 2rem;
    }
  }
  .group-create-button {
    margin-top: 2rem;
    display:flex;
    justify-content:center;
  }
  .main-page-title{
    font-family: 'Black Han Sans', sans-serif;
    color: #000000;
    padding: 5%;
    align-self:start;
    .main-title {
        font-size: 6em;
      }
    .main-subtitle{
        font-size: 4em;
        .highlight{
            color:#e41d60
        }
      }
    }
  }

  .study-group-list{
      align-self:center;

      display: flex;
      flex-direction: row;
      justify-content: space-evenly;

      background-color: #f8f0ee;
      width: 75rem;
      flex-wrap: wrap;
      margin:0 10%;
      .study-group-card{
          margin: 2em;
      }
  }
`;

/**
 * TODO: 로그인 여부에 따라서 main jumbotron에서 표시되는 정보가 다르다
 * 미로그인시main-page-title 출력
 * 로그인시 MyStudyCarousel 출력
 */

const MainPage = () => {
  const { userIndexState, userIndexDispatch, userInfo } = useContext(
    UserContext
  );
  const { searchList, myGroups } = userIndexState;
  const { userEmail } = userInfo;

  useEffect(() => {
    axios.get(`${REQUEST_URL}/search/all/true`).then(result => {
      const { data } = result;

      for (let i = 0; i < data.length; i++) {
        data[i].id = i;
      }

      userIndexDispatch(set_groups(data));
    });
  }, []);

  return (
    <Main>
      <div className="main-jumbotron">
        {userEmail ? (
          <>
            {myGroups.length ? (
              <MyStudyCarousel></MyStudyCarousel>
            ) : (
              "현재 소속된 스터디 그룹이 없습니다."
            )}
            <Link to="/group/create" className="group-create-button">
              {" "}
              <button className="button"> 그룹 생성 </button>
            </Link>
          </>
        ) : (
          <div className="main-page-title">
            <div className="main-title">스터디,</div>
            <div className="main-subtitle">
              <span className="highlight">모집</span>부터{" "}
              <span className="highlight">예약</span>까지 한번에-
            </div>
          </div>
        )}
      </div>

      <div className="study-group-list">
        {searchList.length
          ? searchList.map(groupData => {
              return (
                <StudyGroupCard
                  key={groupData.id}
                  groupData={groupData}
                ></StudyGroupCard>
              );
            })
          : "데이터가 업소용"}
      </div>
    </Main>
  );
};

export default MainPage;
