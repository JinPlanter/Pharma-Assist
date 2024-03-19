    // Renders a search input field with a placeholder text "Search by name, class or student ID"
    it('should render a search input field with the correct placeholder text', () => {
        const wrapper = shallow(<SearchBar />);
        const input = wrapper.find('input');
        expect(input.prop('placeholder')).to.equal('Search by name, class or student ID');
      });