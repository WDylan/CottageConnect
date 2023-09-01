import React, { Component } from "react";
import CottageInfos from "./CottageInfos";
import CottagePhotos from "./CottagePhotos";
import CottageName from "./CottageName";
import CottagePrice from "./CottagePrice";
import CottageSuccess from "./CottageSuccess";
import CottageConfirm from "./CottageConfirm";
import axios from "axios";
import { checkAuth } from "../auth";

import "./AddCottages.scss";

export default class AddCottages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: false,
      id_cottages: "",
      step: 1,
      name: "",
      content: "",
      dayprice: "",
      caution: "",
      adress: "",
      city: "",
      code_postal: "",
      max_personnes: "",
      id_prestation: "1",
      id_categories: "1",
      id_regions: "1",
      id_proprio: "",
      categories: [],
      regions: [],
      prestations: [],
      file: "",
    };
  }

  setAuth = (value) => {
    this.setState({ auth: value });
  };

  componentDidMount() {
    checkAuth(this.setAuth);
    this.fetchPrestations();
    this.fetchRegions();
    this.fetchUserId();
    this.fetchCategories();
  }
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.auth && !this.state.auth) {
      window.location.href = "/login";
    }
  }

  fetchPrestations = () => {
    axios
      .get("http://localhost:3001/prestations")
      .then((res) => {
        this.setState({ prestations: res.data });
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des prestations :", err);
      });
  };

  fetchRegions = () => {
    axios
      .get("http://localhost:3001/regions")
      .then((res) => {
        this.setState({ regions: res.data });
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des régions :", err);
      });
  };

  fetchCategories = () => {
    axios
      .get("http://localhost:3001/categories")
      .then((res) => {
        this.setState({ categories: res.data });
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des catégories :", err);
      });
  };

  fetchUserId = () => {
    axios
      .get("http://localhost:3001/users/")
      .then((res) => {
        this.setState({ id_proprio: res.data.id });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({ step: step + 1 });
  };

  prevStep = () => {
    const { step } = this.state;
    this.setState({ step: step - 1 });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/cottages/withAdress", this.state)
      .then((res) => {
        this.setState({ id_cottages: res.data.id });
        this.setState({ step: 5 });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  handlePhoto = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id_cottages", this.state.id_cottages);
    formData.append("photo", this.state.file);
    axios
      .post("http://localhost:3001/pictures/", formData)
      .then(() => {
        this.setState({ step: 6 });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleFile = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
  };
  handleChange = (input) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    this.setState({ [input]: value });
  };

  render() {
    const {
      id_cottages,
      step,
      categories,
      regions,
      prestations,
      name,
      content,
      dayprice,
      caution,
      adress,
      city,
      code_postal,
      max_personnes,
      id_prestation,
      id_regions,
      id_categories,
      id_users,
      file,
    } = this.state;

    const values = {
      id_cottages,
      name,
      content,
      dayprice,
      caution,
      adress,
      city,
      code_postal,
      max_personnes,
      id_prestation,
      id_regions,
      id_categories,
      id_users,
      file,
    };

    switch (step) {
      case 1:
        return (
          <CottageInfos
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            regions={regions}
            prestations={prestations}
          />
        );
      case 2:
        return (
          <CottageName
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            categories={categories}
          />
        );
      case 3:
        return (
          <CottagePrice
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 4:
        return (
          <CottageConfirm
            prevStep={this.prevStep}
            handleSubmit={this.handleSubmit}
            values={values}
          />
        );
      case 5:
        return (
          <CottagePhotos
            handleSubmit={this.handlePhoto}
            prevStep={this.prevStep}
            handleFile={this.handleFile}
            values={values}
          />
        );
      case 6:
        return <CottageSuccess />;
      default:
        break;
    }
  }
}
