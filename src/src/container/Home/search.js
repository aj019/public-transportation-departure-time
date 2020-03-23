import React, {Component} from 'react'
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import PropTypes from 'prop-types'
import Colors from '../../constants/colors'
import Icon from '../../constants/icons'
import styled from 'styled-components'

const StyledDiv = styled.div`
  color: #fff;
  background-color: ${props => props.color};
  padding: 10px;
  height: 20%;
`

const StyledSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

const StyledH1 = styled.h1`
  margin: 0;
`

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  font-size: 1.2rem;
`

const StyledButton = styled.button`
  border: none;
  background: none;
`

export default class Search extends Component {
  static propTypes = {
    onInputChange: PropTypes.func,
    handleSelect: PropTypes.func,
    address: PropTypes.string
  }

  render() {
    const {onInputChange, handleSelect, address} = this.props

    return (
      <StyledDiv color={Colors.primaryColor}>
        <StyledH1>Search Starting Point</StyledH1>

        <PlacesAutoComplete
          value={address}
          onChange={onInputChange}
          onSelect={handleSelect}
        >
          {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
            <div>
              <StyledSearchContainer>
                <StyledInput
                  {...getInputProps({
                    placeholder: 'Search Places ...',
                    className: 'location-search-input'
                  })}
                />
              </StyledSearchContainer>
              <div className='autocomplete-dropdown-container'>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, i) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item'
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? {
                        backgroundColor: '#fafafa',
                        color: Colors.black,
                        cursor: 'pointer'
                      }
                    : {
                        backgroundColor: '#ffffff',
                        color: Colors.black,
                        cursor: 'pointer'
                      }
                  return (
                    <div
                      key={i}
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </PlacesAutoComplete>
      </StyledDiv>
    )
  }
}
