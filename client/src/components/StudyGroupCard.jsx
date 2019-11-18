import React from "react";
import styled from "styled-components";
import StudyThumbnail from "./StudyThumbnail";
import CardTitle from "./CardTitle";
import StudyLocation from "./StudyLocation";
import StudyTime from "./StudyTime";
import StudyPersonnel from "./StudyPersonnel";

const Card = styled.div``;

const StudyGroupCard = props => (
  <Card>
    <StudyThumbnail src={props.src} alt={props.alt} />
    <CardTitle title={props.title} />
    <StudyLocation location={props.location} />
    <StudyTime time={props.time} />
    <StudyPersonnel now={props.now} max={props.max} />
  </Card>
);

export default StudyGroupCard;
