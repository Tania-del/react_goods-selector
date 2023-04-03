import React from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goods = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const DEFAULT_SELECTED_NAME = 'Jam';

type AppState = {
  selectedName: string | undefined;
};

type AppProps = {};

export class App extends React.Component<AppProps, AppState> {
  state = {
    selectedName: DEFAULT_SELECTED_NAME,
  };

  updateProducts = (goodName: string) => {
    this.setState({
      selectedName: this.isNameMatch(goodName) ? '' : goodName,
    });
  };

  deleteSelectedName = () => {
    this.setState({
      selectedName: undefined,
    });
  };

  isNameMatch = (goodName: string) => {
    const { selectedName } = this.state;

    return goodName === selectedName;
  };

  render() {
    const { selectedName } = this.state;
    const { isNameMatch, updateProducts, deleteSelectedName } = this;

    return (
      <main className="section container">
        <h1 className="title is-flex is-align-items-center">
          {selectedName ? `${selectedName} is selected` : 'No goods selected'}

          {selectedName && (
          /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              onClick={deleteSelectedName}
              data-cy="ClearButton"
              type="button"
              className="delete ml-3"
            />
          )}
        </h1>

        <table className="table">
          <tbody>
            {goods.map((good) => {
              const isMatched = isNameMatch(good);

              return (
                <tr
                  key={good}
                  className={isMatched ? 'has-background-success-light' : ''}
                  data-cy="Good"
                >
                  <td>
                    <button
                      data-cy={isMatched ? 'RemoveButton' : 'AddButton'}
                      onClick={() => updateProducts(good)}
                      type="button"
                      className={isMatched ? 'button is-info' : 'button'}
                    >
                      {isMatched ? '-' : '+'}
                    </button>
                  </td>
                  <td data-cy="GoodTitle" className="is-vcentered">
                    {good}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    );
  }
}
