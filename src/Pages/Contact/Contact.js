import React from "react";
import {Header} from "../../Components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faXing, faGithub } from "@fortawesome/free-brands-svg-icons";
import {Button} from "antd"
class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: "",
      description: "",
      topic: "",
      mailError: false,
      mailText: "",
      crawler: null,
      disabled: true,
      showForm: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);
  }

  handleSubmit(form) {
    const url = "https://submit-form.com/ew9ytDnJ9rB7_ZUrRiANZ?";
    const { mail, description, topic, crawler } = this.state;
    form.preventDefault();
    // if this field is not empty it is most likely a bot and we do nothing
    if (!crawler) {
      if (!mail || !mail.includes("@")) {
        this.setState({
          mailError: true,
          mailText: "Bitte valide Kontaktmöglichkeit angeben",
        });
      }
      else{
        const body = {
          mail: mail,
          description: description,
          topic: topic
        }
        // axios.post(url, body).then(
        //   this.setState({
        //     mail: "",
        //     description: "",
        //     topic: "",
        //     showForm: false
        //   })
        // )

      }
    }
  }

  handleMailChange(value) {
    if (this.state.mailError) {
      this.setState({
        mailError: false,
        mailText: "",
        mail: value,
      });
    } else {
      this.setState({ mail: value });
    }
    value ? this.state.disabled = false : this.state.disabled = true
  }

  render() {
    const {game} = this.props
    return (
      <div>
        {!game && <Header />}

        <div className="contact">
          <div className="contact-heading">Kontakt:</div>

          <div className="contact-image"></div>

          <div className="contact-first-line">
            Bei Interesse, Rückfragen oder unverbindlichen Anfragen bitte einen
            der folgenden Kommunikationskanäle nutzen:
          </div>

          <div className="contact-options">
            <div className="contact-icons">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
              <div className="contact-icon">
                <FontAwesomeIcon icon={faXing} size="2x" />
              </div>
              <div className="contact-icon">
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </div>
            </div>
            <div className="contact-values">
              <div className="contact-mailadress">
                benjaminzenth@icloud.com
              </div>
              <div className="contact-text">
                <a
                  target="_blank"
                  href="https://www.xing.com/profile/Benjamin_Zenth/cv"
                >
                  Benjamin Zenth
                </a>
              </div>
              <div className="contact-text">
                <a target="_blank" href="https://github.com/chooklii">
                  Github
                </a>
              </div>
            </div>
          </div>

          <h2 className="contact-formular-heading">Kontaktformular</h2>
          <div className="contact-first-line">Einfach Daten eingeben und ich melde mich bei Ihnen.</div>
          {this.state.showForm &&
          <form className="form-contact" noValidate autoComplete="off">
            {/*
            <div className="form-topic">
            <TextField
            className="form-topic"
              id="topic"
              label="Thema"
              value={this.state.topic}
              onChange={(e) => this.setState({ topic: e.target.value })}
            />
            </div>
            <div className="form-description">
            <TextField
              id="description"
              multiline={true}
              label="Beschreibung"
              value={this.state.description}
              onChange={(e) => this.setState({ description: e.target.value })}
            />
            </div>
            <div className="form-crawler">
            <TextField
              id="crawler"
              label="crawler"
              onChange={(e) => this.setState({ crawler: e.target.value })}
            />
            </div>
            <div className="form-mail">
            <TextField
              id="mail"
              label="Mailadresse"
              value={this.state.mail}
              error={this.state.mailError}
              onChange={(e) => this.handleMailChange(e.target.value)}
              helperText={this.state.mailText}
            />
            </div>
            */}
            <div className="form-button">
            <Button onClick={this.handleSubmit} variant="contained" color="primary" disabled={this.state.disabled}>Abschicken</Button>
            </div>
          </form>
          }
          {!this.state.showForm &&
          <div className="contact-success">
            <div className="contact-message-success">Danke für Ihre Nachricht! - Ich melde mich in Kürze bei Ihnen. </div>
            <div className="contact-success-button">
            <Button size="small" onClick={() => this.setState({showForm: true})} variant="contained" color="primary">Neue Anfrage abschicken</Button>
            </div>
          </div>
          }

        </div>
      </div>
    );
  }
}

export default Contact;
