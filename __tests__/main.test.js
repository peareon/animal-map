import '@testing-library/jest-dom';
const axios = require('axios');
import { fireEvent, screen } from '@testing-library/react';
import App from '../src/App';
import store from '../src/redux/store';
import { renderWithProviders } from '../src/utils/test-utils';
import { getScienfiticName } from '../src/redux/slices/gemini.slice';
import { getDescriptions, resetStatus } from '../src/redux/slices/gbif.slice';
import { click } from '@testing-library/user-event/dist/click';


jest.mock('axios');
const mockedAxios = axios;

jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => null,
  Marker: () => null,
  Popup: () => null,
  useMap: () => ({}),
}));

jest.mock('leaflet', () => ({
  Icon: {
    Default: {
      prototype: { _getIconUrl: jest.fn() },
    },
  },
}));

const mockSpeciesResponse = {
      "content": {
        "parts": [
          {
            "text": "Género: *Panthera*\nEspecie: *Panthera onca*",
            "thoughtSignature": "EjQKMgG+Pvb7uHGC7ECtfb23NDw4uZvpvixtFNWzHPo5o/XhxG7AZ5ivSjKl9zVOm9hxSJa6"
          }
        ],
        "role": "model"
      },
      "finishReason": "STOP",
      "index": 0
};

const mockSpecieDetailResponse = {
    "key": 2440483,
    "nameKey": 7877340,
    "datasetKey": "d7dddbf4-2cf0-4f39-9b2a-bb099caae36c",
    "constituentKey": "7ddf754f-d193-4cc9-b351-99906754a03b",
    "nubKey": 2440483,
    "parentKey": 2440482,
    "parent": "Orcinus",
    "basionymKey": 2440489,
    "basionym": "Delphinus orca Linnaeus, 1758",
    "kingdom": "Animalia",
    "phylum": "Chordata",
    "order": "Cetacea",
    "family": "Delphinidae",
    "genus": "Orcinus",
    "species": "Orcinus orca",
    "kingdomKey": 1,
    "phylumKey": 44,
    "classKey": 359,
    "orderKey": 733,
    "familyKey": 5314,
    "genusKey": 2440482,
    "speciesKey": 2440483,
    "scientificName": "Orcinus orca (Linnaeus, 1758)",
    "canonicalName": "Orcinus orca",
    "authorship": "(Linnaeus, 1758) ",
    "publishedIn": "Syst. Nat., 10th ed. vol.1 p.77",
    "nameType": "SCIENTIFIC",
    "taxonomicStatus": "ACCEPTED",
    "rank": "SPECIES",
    "origin": "SOURCE",
    "numDescendants": 3,
    "numOccurrences": 0,
    "taxonID": "gbif:2440483",
    "extinct": false,
    "habitats": [
      "MARINE"
    ],
    "nomenclaturalStatus": [],
    "threatStatuses": [
      "DATA_DEFICIENT",
      "DATA_DEFICIENT",
      "NOT_APPLICABLE",
      "DATA_DEFICIENT",
      "DATA_DEFICIENT",
      "DATA_DEFICIENT",
      "NOT_EVALUATED"
    ],
    "descriptions": [
      {
        "description": "Range: Incidental catches of O. orca occurred in the East Sea and around Jeju Island (Cetacean Research Institute 2007; Fig. 93)."
      },
      {
        "description": "Remarks: The killer whale, an abundant, highly social species with reduced genetic variation, has no consistent geographical pattern of global diversity and no mtDNA variation within regional populations (Hoelzel et al. 2002). Because of range-wide low genetic diversity, the killer whale remains a monotypic species, even though two subspecies (resident killer whale and transient killer whale or Bigg’s killer whale) or three ecotypes have been proposed (Reeves & Read 2003; Morin et al. 2010). Compared to Antarctic and eastern North Pacific populations, which have three well-described ecotypes (Stevens et al. 1989; Pitman & Ensor 2003), populations of O. orca in the western North Pacific have been poorly studied. Both specialized piscivorous resident and mammal eating transient ecotypes inhabit the western North Pacific Ocean (Burdin et al. 2007; Pilot et al. 2010; Morin et al. 2010); the ecotype inhabiting seas around Korea remains uncertain."
      },
      {
        "description": "Orca pacifica Gray, 1870 p. 76; Type locality- North Pacific."
      },
      {
        "description": "“ Oceano Europo. ”"
      }]
};


beforeEach(() => {
  // Se limpia el estado de búsqueda antes de cada test para evitar
  // que los resultados de una prueba afecten a otra.
  store.dispatch(resetStatus());

  // Se resetean los mocks de axios para que cada test arranque limpio.
  mockedAxios.get.mockReset();
});


describe('App component', () => {
  it('should render the Header component', () => {
    renderWithProviders(<App />);

    expect(screen.getByText('Phyloc')).toBeInTheDocument();
  });

  it('should render the search input', () => {
    renderWithProviders(<App />);

    // CAMBIO:
    // Validación semántica usando role en vez de búsquedas menos confiables.
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('should render the initial search state message', () => {
    renderWithProviders(<App />);

    // CAMBIO:
    // Se valida el comportamiento real del App en estado inicial,
    // en lugar de asumir que SearchResults siempre muestra resultados.
    expect(screen.getByText(/Conocer m[aá]s sobre la app/i)).toBeInTheDocument();
  });

  it('should not render the Library component initially if the app does not show it on IDLE state', () => {
    renderWithProviders(<App />);

    // CAMBIO:
    // Se valida el comportamiento real del App según su estado inicial.
    // Si la biblioteca no aparece en IDLE, este test lo refleja correctamente.
    expect(screen.queryByText(/Estado de la especie/i)).not.toBeInTheDocument();
  });
});

describe('Get scientific name conversion from gemini API', () => {
  it('should update the input value correctly', () => {
    renderWithProviders(<App />);

    // CAMBIO:
    // Se reemplaza una búsqueda incorrecta tipo getByName por getByRole('textbox'),
    // que es la forma recomendada por Testing Library.
    const searchBar = screen.getByRole('textbox');

    fireEvent.change(searchBar, {
      target: { name: 'animal', value: 'jaguar' },
    });

    expect(searchBar).toHaveValue('jaguar');
  });

  it('should fetch the scientific name of an specie', async () => {

    mockedAxios.post.mockResolvedValue({
      data: {
        candidates: [mockSpeciesResponse],
      },
    });

    const resultAction = await store.dispatch(getScienfiticName('jaguar'));

    expect(resultAction.type).toBe('gemini/fetchScientificName/fulfilled');
    const fullState = store.getState().gemini;
    console.log(fullState)
    expect(fullState.scientificName.species).toMatch(/Panthera onca/i);
    
  });
});

describe('Map and details about the specie', () => {
  it('Fetch the Taxon ID from the specie', async() => {

    mockedAxios.get.mockResolvedValue({
      data: {
        results: [mockSpecieDetailResponse],
      },
    });

    const resultAction = await store.dispatch(getDescriptions('Panthera onca'));

    expect(resultAction.type).toBe('gbif/getDescription/fulfilled');
    const fullState = store.getState().gbif;
    console.log("GBIF state: ", fullState)
    expect(fullState.animalInfo.taxonID).toBe(2440483);

  });

  it('should render the map and specie´s detail', async() => {
    

   mockedAxios.get.mockResolvedValue({
      data: {
        results: [mockSpecieDetailResponse],
      },
    });

    const resultAction = await store.dispatch(getDescriptions('Panthera onca'));
    renderWithProviders(<App />);
    const elemento = await screen.findByText(/Datos sobre la especie/i);
    expect(elemento).toBeInTheDocument();
  });
});



describe('App info page', () => {
  it('should render the app information and navigate to the page properly', async() => {
    renderWithProviders(<App />);
    const elemento = screen.getByText(/Conocer m[aá]s sobre la app/i);
    fireEvent.click(elemento);
    const elementoUpdated = await screen.findByText(/Esta aplicación utiliza la API/);
    expect(elementoUpdated).toBeInTheDocument();

  });
});


describe('Species full detail render', () => {
  it('should render the app information and navigate to the page properly', async() => {
    mockedAxios.get.mockResolvedValue({
      data: {
        results: [mockSpecieDetailResponse],
      },
    });

    const resultAction = await store.dispatch(getDescriptions('Panthera onca'));
    renderWithProviders(<App />);
    const elemento = await screen.findByText(/Click para m[aá]s informaci[oó]n/i);
    expect(elemento).toBeInTheDocument();
    const elementoNavigated = await screen.findByText(/Información de Panthera onca/i);
    expect(elementoNavigated).toBeInTheDocument();

  });
});
