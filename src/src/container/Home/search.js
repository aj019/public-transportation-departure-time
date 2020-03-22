import React, {Component} from 'react'
import PlacesAutoComplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete'
import PropTypes from 'prop-types'

export default class Search extends Component {
  static propTypes = {
    onInputChange: PropTypes.func,
    handleSelect: PropTypes.func,
    address: PropTypes.string
  }

  render() {
    const {onInputChange, handleSelect, address} = this.props
    return (
      <PlacesAutoComplete
        value={address}
        onChange={onInputChange}
        onSelect={handleSelect}
      >
        {({getInputProps, suggestions, getSuggestionItemProps, loading}) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input'
              })}
            />
            <div className='autocomplete-dropdown-container'>
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item'
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {backgroundColor: '#fafafa', cursor: 'pointer'}
                  : {backgroundColor: '#ffffff', cursor: 'pointer'}
                return (
                  <div
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
    )
  }
}
